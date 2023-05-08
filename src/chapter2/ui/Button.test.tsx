import { describe, expect, test } from "vitest";
import * as renderer from "react-test-renderer";
import { Button } from "./Button";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  test("renders correctly with react-test-renderer", () => {
    const button = renderer.create(<Button />);
    expect(button.toJSON()).toMatchSnapshot();
  });

  test("changes the button text upon clicking the button using React Testing Library", async () => {
    const button = render(<Button />);
    const user = userEvent.setup();
    await user.click(button.getByRole("button", { name: "ON" }));
    expect(button.getByRole("button", { name: "OFF" })).toBeTruthy();
    await user.click(button.getByRole("button", { name: "OFF" }));
    expect(button.getByRole("button", { name: "ON" })).toBeTruthy();
  });
});
