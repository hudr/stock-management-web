import { Sidebar } from "../../components";

const DashboardLayout = ({ children }) => {
  return (
    <>
      {/* Como a sidebar possui uma área interna a abordagem fica assim */}
      <Sidebar pageContent={children} />
    </>
  );
};

export default DashboardLayout;
