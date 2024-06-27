import Image from "next/image";

function Dashboard() {
  return (
    <Image
      src={`/images/dashboard.png`}
      alt="dashboard icon"
      width={40}
      height={40}
    />
  );
}

export default Dashboard;
