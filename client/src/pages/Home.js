import { useState, useEffect } from 'react';
import { useDatasContext } from "../hooks/useDatasContext";
import { useAuthContext } from "../hooks/useAuthContext";
import DataDetails from '../components/DataDetails';
import DataForm from '../components/DataForm';

const Home = () => {
  const { datas, dispatch } = useDatasContext();
  const { user } = useAuthContext();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('Rollno');
  const [filterBranch, setFilterBranch] = useState('');
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

  // Sorting function
  const sortData = (data) => {
    if (!data || data.length === 0) return []; // Prevent error if data is null or empty
    return [...data].sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    });
  };

  // Filtering function
  const filterData = (data) => {
    if (!data || !filterBranch) return data; // Handle null data or no filter branch
    return data.filter(item => item.Branch.toLowerCase().includes(filterBranch.toLowerCase()));
  };

  // Combine filtering and sorting
  useEffect(() => {
    if (datas) {
      const filtered = filterData(datas);
      const sorted = sortData(filtered);
      setFilteredData(sorted);
    } else {
      setFilteredData([]); // Reset filtered data if datas is null
    }
  }, [datas, sortField, filterBranch]);

  const renderAdminPage = () => (
    <>
      <center><h2 className="a">Admin Page</h2></center>
      <div>
        <center><label htmlFor="branchFilter">Filter by Branch:</label>
        <input 
          type="text" 
          id="branchFilter" 
          value={filterBranch} 
          onChange={(e) => setFilterBranch(e.target.value)} 
        /></center>

        <center><label htmlFor="sortField">Sort by:</label>
        <select 
          id="sortField" 
          value={sortField} 
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="Rollno">Roll Number</option>
          <option value="Branch">Branch</option>
          <option value="BatchYear">Batch Year</option>
          <option value="createdAt">Created At</option>
        </select></center>
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