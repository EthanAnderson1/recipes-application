import { render, screen, fireEvent } from "@testing-library/react";
import {AppNavbar} from "../../components/NavBar.tsx";
import { UserContext } from "../../services/UserContext.tsx";
import { RecipeContext } from "../../services/RecipeContext.tsx";
import "@testing-library/jest-dom"


jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));


describe("AppNavbar", () => {
  beforeEach(() => {
    localStorage.clear();
  });
const user = 'test';
  it("should render Recipes and Logout when logged in", () => {
    render(<UserContext.Provider value={[user]}>
            <AppNavbar />
          </UserContext.Provider>);
    expect(screen.getByText("Recipes")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("should log out and clears token", () => {
    localStorage.setItem("token", "fake-token");
    render(<UserContext.Provider value={[user, jest.fn()]}>
      <RecipeContext.Provider value={[null, jest.fn()]}>
        <AppNavbar/>
      </RecipeContext.Provider>
      </UserContext.Provider>);
    fireEvent.click(screen.getByText(/Logout/i));
    expect(localStorage.getItem("token")).toBeNull();
  });
});
