import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DashboardPeriodSwitcher } from "@/components/dashboard-period-switcher";

describe("dashboard period switcher", () => {
  it("emits the selected period", () => {
    const onChange = vi.fn();

    render(<DashboardPeriodSwitcher period="day" onChange={onChange} />);
    fireEvent.click(screen.getByRole("tab", { name: /tháng/i }));

    expect(onChange).toHaveBeenCalledWith("month");
  });
});
