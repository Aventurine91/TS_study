import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
<<<<<<< HEAD
=======

>>>>>>> 70af48ce0a0af69bdb401dda20fc7dda437f6216
import Header from "./shared/components/header";
import DetailPage from "./pages/detailPage/DetailPage";
import FocusPage from "./pages/focusPage/FocusPage";
import TodayHabits from "./pages/habits/todayHabits";


function App() {
  return (
    <BrowserRouter>
      <div id="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todayhabits" element={<TodayHabits />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/focus" element={<FocusPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
