import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chat } from "../components/Chat";

describe("Home", () => {
  it("Should render the chat", () => {
    const { getByTestId } = render(<Chat />);

    expect(getByTestId("chat")).toBeInTheDocument();
  });
});
