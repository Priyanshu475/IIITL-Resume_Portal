import { useDatasContext } from '../hooks/useDatasContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const DataDetails = ({ data }) => {
  const { dispatch } = useDatasContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/data/${data._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'DELETE_DATA', payload: json });
      }
    } catch (error) {
      console.error('Failed to delete data:', error);
    }
  };

  const renderDataDetails = () => (
    <div className="data-details">
      <h4>{data.FullName}</h4>
      <h5>{data.Rollno}</h5>
      <p><strong>Batch Year:</strong> {data.BatchYear}</p>
      <p><strong>Branch:</strong> {data.Branch}</p>
      <p><strong>CGPA:</strong> {data.CGPA}</p>
      <p><strong>Active Backlog:</strong> {data.ActiveBacklogs}</p>
      <a href={data.ResumeLink} target="_blank" rel="noreferrer">Resume Link</a>
      {user.role !== 'admin' && (
        <p>{formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}</p>
      )}
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );

  return renderDataDetails();
};

export default DataDetails;
