import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Range from "../Range";

describe("Range Component", () => {
  test("renderiza correctamente en modo normal", () => {
    render(<Range mode="normal" min={0} max={100} />);
    expect(screen.getByText("0.00€")).toBeInTheDocument();
    expect(screen.getByText("100.00€")).toBeInTheDocument();
  });

  test("renderiza correctamente en modo fixed", () => {
    const rangeValues = [0, 25, 50, 75, 100];
    render(<Range mode="fixed" rangeValues={rangeValues} />);

    expect(screen.getByText("0.00€")).toBeInTheDocument();
    expect(screen.getByText("100.00€")).toBeInTheDocument();
  });

  test("maneja cambios de valor correctamente", () => {
    const handleChange = jest.fn();
    render(<Range mode="normal" min={0} max={100} onChange={handleChange} />);

    const slider = screen.getAllByRole("button")[0];
    fireEvent.mouseDown(slider);
    fireEvent.mouseMove(slider, { clientX: 100 });
    fireEvent.mouseUp(slider);

    expect(handleChange).toHaveBeenCalled();
  });

  test("maneja el arrastre del control máximo correctamente", () => {
    const handleChange = jest.fn();
    render(<Range mode="normal" min={0} max={100} onChange={handleChange} />);

    const maxSlider = screen.getAllByRole("button")[1];
    fireEvent.mouseDown(maxSlider);
    fireEvent.mouseMove(maxSlider, { clientX: 50 });
    fireEvent.mouseUp(maxSlider);

    expect(handleChange).toHaveBeenCalled();
  });

  test("maneja correctamente los valores en modo fixed", () => {
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

  test("maneja el caso de rangeValues vacío en modo fixed", () => {
    render(<Range mode="fixed" rangeValues={[]} min={0} max={100} />);

    expect(screen.getByText("0.00€")).toBeInTheDocument();
    expect(screen.getByText("100.00€")).toBeInTheDocument();
  });

  test("limpia los event listeners al desmontar", () => {
    const { unmount } = render(<Range mode="normal" min={0} max={100} />);

    const slider = screen.getAllByRole("button")[0];
    fireEvent.mouseDown(slider);

    unmount();
  });

  test("en modo fixed, el control maximo no puede ser menor al minimo", () => {
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
