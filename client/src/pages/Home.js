import { useState, useEffect } from 'react';
import { useDatasContext } from "../hooks/useDatasContext";
import { useAuthContext } from "../hooks/useAuthContext";
import DataDetails from '../components/DataDetails';
import DataForm from '../components/DataForm';
import * as XLSX from 'xlsx';

const Home = () => {
  const { datas, dispatch } = useDatasContext();
  const { user } = useAuthContext();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('Rollno');
  const [filterBranch, setFilterBranch] = useState('');
  const [filterCGPA, setFilterCGPA] = useState('');
  const [filterBacklogs, setFilterBacklogs] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchDatas = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/data', {
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        const json = await response.json();
        
        if (response.ok) {
          dispatch({ type: 'SET_DATAS', payload: json });
        } else {
          setError(json.error || 'Failed to fetch data');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDatas();
    }
  }, [dispatch, user]);

  // Sorting function (descending order)
  const sortData = (data) => {
    if (!data || data.length === 0) return [];
    return [...data].sort((a, b) => {
      if (a[sortField] > b[sortField]) return -1;
      if (a[sortField] < b[sortField]) return 1;
      return 0;
    });
  };

  // Filtering function
  const filterData = (data) => {
    if (!data) return [];
    return data.filter(item => {
      const branchMatch = !filterBranch || item.Branch.toLowerCase().includes(filterBranch.toLowerCase());
      const cgpaMatch = !filterCGPA || item.CGPA >= parseFloat(filterCGPA);
      const backlogsMatch = filterBacklogs === '' || item.ActiveBacklogs <= parseInt(filterBacklogs);
      return branchMatch && cgpaMatch && backlogsMatch;
    });
  };

  // Combine filtering and sorting
  useEffect(() => {
    if (datas) {
      const filtered = filterData(datas);
      const sorted = sortData(filtered);
      setFilteredData(sorted);
    } else {
      setFilteredData([]);
    }
  }, [datas, sortField, filterBranch, filterCGPA, filterBacklogs]);

  const downloadExcel = () => {
    if (filteredData.length === 0) {
      alert('No data to download');
      return;
    }

    const headers = ['Roll No', 'Branch', 'Batch Year', 'CGPA', 'Active Backlogs', 'Resume Link'];
    const data = [
      headers,
      ...filteredData.map(data => 
        [data.Rollno, data.Branch, data.BatchYear, data.CGPA, data.ActiveBacklogs, data.ResumeLink]
      )
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Filtered Data");

    // Add some styling
    const colWidths = [15, 20, 15, 10, 15, 100];
    ws['!cols'] = colWidths.map(w => ({ wch: w }));

    // Add filters to the header row
    ws['!autofilter'] = { ref: `A1:F1` };

    // Generate Excel file
    XLSX.writeFile(wb, 'filtered_data.xlsx');
  };

  const renderAdminPage = () => (
    <>
      <center><h1 className="a">Welcome to Admin Placement Portal</h1></center>
      <div>
        <center>
          <label htmlFor="branchFilter">Filter by Branch: </label>
          <input 
            type="text" 
            id="branchFilter" 
            value={filterBranch} 
            onChange={(e) => setFilterBranch(e.target.value)} 
          />

          <label htmlFor="cgpaFilter"> CGPA Cutoff: </label>
          <input 
            type="number" 
            id="cgpaFilter" 
            value={filterCGPA} 
            onChange={(e) => setFilterCGPA(e.target.value)}
            step="0.01"
            min="0"
            max="10"
          />

          <label htmlFor="backlogsFilter"> Max Active Backlogs: </label>
          <input 
            type="number" 
            id="backlogsFilter" 
            value={filterBacklogs} 
            onChange={(e) => setFilterBacklogs(e.target.value)}
            min="0"
          />

          <label htmlFor="sortField"> Sort by: </label>
          <select 
            id="sortField" 
            value={sortField} 
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="Rollno">Roll Number</option>
            <option value="Branch">Branch</option>
            <option value="BatchYear">Batch Year</option>
            <option value="CGPA">CGPA</option>
            <option value="ActiveBacklogs">Active Backlogs</option>
          </select>

          <button onClick={downloadExcel} style={{marginLeft: '10px'}}>
            Download Filtered Data (Excel)
          </button>
        </center>
      </div>
      <div className="datas">
        {filteredData && filteredData.map((data) => (
          <DataDetails key={data._id} data={data} />
        ))}
      </div>
    </>
  );

  const renderUserPage = () => (
    <>
      <center><h2 className="a">Welcome to Placement Portal</h2></center>
      <div className="datas">
        {datas && datas.map((data) => (
          <DataDetails key={data._id} data={data} />
        ))}
      </div>
      <DataForm />
    </>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home">
      {user && user.role === 'admin' ? renderAdminPage() : renderUserPage()}
    </div>
  );
};

export default Home;