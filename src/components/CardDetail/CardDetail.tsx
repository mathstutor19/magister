import { Link, useParams } from 'react-router-dom';
import { data } from '../../data';
import './CardDetails.css'
const CardDetail = () => {
    const { id } = useParams();
   const singleData=data.filter((item)=>item.id==id)[0]
   const batafsilData=singleData.batafsil.split('/');
  return (
   <div className="disease-card">
    <Link className="disease-link" to='/'>Bosh sahifa</Link>
  <h2 className="disease-title">{singleData.kasallik}ligi haqida batafsil ma'lumot </h2>
  
  <img 
    className="disease-image" 
    src={singleData.image} 
    alt={singleData.kasallik} 
  />

  
  <div className="extra-info">
    {batafsilData.map((item, index) => (
      <p key={index} className="extra-item">• {item}</p>
    ))}
  </div>
</div>
  )
}

export default CardDetail