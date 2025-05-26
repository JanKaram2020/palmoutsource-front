import OrdersTable from "./components/OrdersTable.tsx";

const App = () => {
  return (
    <div>
      <h1 className={"text-2xl text-center mt-5"}>
        Palm Outsource Barista Dashboard
      </h1>
      <OrdersTable />
    </div>
  );
};

export default App;
