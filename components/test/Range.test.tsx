import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Range from "../Range";

describe("Range Component", () => {
  test("renders correctly in normal mode", () => {
    render(<Range mode="normal" min={0} max={100} />);
    expect(screen.getByText("0.00€")).toBeInTheDocument();
    expect(screen.getByText("100.00€")).toBeInTheDocument();
  });

  test("renders correctly in fixed mode", () => {
    const rangeValues = [0, 25, 50, 75, 100];
    render(<Range mode="fixed" rangeValues={rangeValues} />);

    expect(screen.getByText("0.00€")).toBeInTheDocument();
    expect(screen.getByText("100.00€")).toBeInTheDocument();
  });

  test("handles value changes correctly", () => {
    const handleChange = jest.fn();
    render(<Range mode="normal" min={0} max={100} onChange={handleChange} />);

    const slider = screen.getAllByRole("button")[0];
    fireEvent.mouseDown(slider);
    fireEvent.mouseMove(slider, { clientX: 100 });
    fireEvent.mouseUp(slider);

    expect(handleChange).toHaveBeenCalled();
  });

  test("handles maximum control drag correctly", () => {
    const handleChange = jest.fn();
    render(<Range mode="normal" min={0} max={100} onChange={handleChange} />);

    const maxSlider = screen.getAllByRole("button")[1];
    fireEvent.mouseDown(maxSlider);
    fireEvent.mouseMove(maxSlider, { clientX: 50 });
    fireEvent.mouseUp(maxSlider);

    expect(handleChange).toHaveBeenCalled();
  });

  test("handles values correctly in fixed mode", () => {
    const rangeValues = [0, 25, 50, 75, 100];
    const handleChange = jest.fn();
    render(
      <Range mode="fixed" rangeValues={rangeValues} onChange={handleChange} />
    );

    const minSlider = screen.getAllByRole("button")[0];
    const maxSlider = screen.getAllByRole("button")[1];

    fireEvent.mouseDown(minSlider);
    fireEvent.mouseMove(minSlider, { clientX: 30 });
    fireEvent.mouseUp(minSlider);

    fireEvent.mouseDown(maxSlider);
    fireEvent.mouseMove(maxSlider, { clientX: 70 });
    fireEvent.mouseUp(maxSlider);

    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  test("handles empty rangeValues in fixed mode", () => {
    render(<Range mode="fixed" rangeValues={[]} min={0} max={100} />);

    expect(screen.getByText("0.00€")).toBeInTheDocument();
    expect(screen.getByText("100.00€")).toBeInTheDocument();
  });

  test("cleans up event listeners on unmount", () => {
    const { unmount } = render(<Range mode="normal" min={0} max={100} />);

    const slider = screen.getAllByRole("button")[0];
    fireEvent.mouseDown(slider);

    unmount();
  });

  test("in fixed mode, maximum control cannot be less than minimum", () => {
    const rangeValues = [0, 25, 50, 75, 100];
    const handleChange = jest.fn();
    render(
      <Range mode="fixed" rangeValues={rangeValues} onChange={handleChange} />
    );

    expect(screen.getByText("0.00€")).toBeInTheDocument();
    expect(screen.getByText("100.00€")).toBeInTheDocument();

    const maxSlider = screen.getAllByRole("button")[1];
    fireEvent.mouseDown(maxSlider);
    fireEvent.mouseMove(maxSlider, { clientX: -500 });
    fireEvent.mouseUp(maxSlider);

    expect(handleChange).toHaveBeenCalled();
    expect(screen.getByText("25.00€")).toBeInTheDocument();
  });
});
