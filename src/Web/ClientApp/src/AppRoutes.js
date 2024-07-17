import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import MyTeam from "./components/MyTeam";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/my-team',
    element: <MyTeam />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  }
];

export default AppRoutes;
