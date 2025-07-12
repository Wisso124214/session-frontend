import './Note.css';

export default function Note({ data, type, onClick }) {
  return (
    <div className='note-container'>
      <div className='note' onClick={onClick}>
        <img className='note-logo' src={data.logo} />
      </div>
      <div className='note-name'> {data.name} </div>
    </div>
  );
}