import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("체크박스 테스트", () => {
  it("체크박스는 처음에 선택되어있지 않다.", () => {
    render(<SummaryForm />);
    const checkBox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(checkBox).not.toBeChecked();
  });

  it("체크 박스를 선택하면 버튼이 활성화 된다.", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);
    const checkBox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /confirm order/i });

    await user.click(checkBox);
    expect(button).toBeEnabled();
  });

  it("체크 박스를 2번 선택하면 버튼이 다시 비활성화 된다.", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);
    const checkBox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /confirm order/i });

    await user.click(checkBox);
    expect(button).toBeEnabled();

    await user.click(checkBox);
    expect(button).toBeDisabled();
  });

  it("popover responds to hover", async () => {
    render(<SummaryForm />);

    // set up userEvent
    const user = userEvent.setup();

    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    await user.unhover(termsAndConditions);
    const overlay = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(overlay).not.toBeInTheDocument();
  });
});
