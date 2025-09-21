import CurvedNav from "./curvedNav";

export default function Header({ options }) {
  return (
    <>
      <div style={{ height: '60px' }}>
        <img src={'/images/logo.png'} alt="M" style={{ height: '50px', margin: '10px 20px', zIndex: '1000', position: 'fixed', left: '1px', top: '1px' }} />
      </div>
      <CurvedNav options={options} />
    </>
  );
}