import { getServerSession, getServerToken } from "@/lib/get-server-auth";
import { forbidden } from "next/navigation";

const MyProfilePage = async () => {
  const session = await getServerSession();
  if (!session) return forbidden();

  const { token } = await getServerToken();
  try {
    const data = await fetch("http://localhost:8081/secure", {
      headers: {
        Authorizarion: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    console.log(data);
  } catch (ex) {
    console.error("Error fetching data" + ex);
  }
  return <div style={{ padding: "20px", wordBreak: "break-all" }}>{token}</div>;
};

export default MyProfilePage;
