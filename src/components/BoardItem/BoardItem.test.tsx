import BoardItem from "./BoardItem";
import {renderWithProviders} from "../../utils/test-utils";
import {fireEvent, screen} from "@testing-library/react";
import {IssuesCategories} from "../../redux/slices/repoSlice";

const mockIssue = {
    title: "Mock Issue",
    comments: 3,
    created_at: "2022-04-12T10:00:00Z",
    number: 1,
    state: "open",
    user: { login: "mockUser" }
}

describe("BoardItem Component", () => {
    it("renders issue details correctly", () => {
        const { getByText } = renderWithProviders(<BoardItem category={IssuesCategories.TODO} issue={mockIssue} />)

        expect(getByText(/Mock Issue/i)).toBeInTheDocument()
        expect(getByText(/#1/)).toBeInTheDocument();
        expect(getByText(/mockUser/i)).toBeInTheDocument()
        expect(getByText(/Comments: 3/)).toBeInTheDocument()
    })

    const mockCategory = IssuesCategories.TODO

    it("triggers drag start event correctly", () => {
        renderWithProviders(<BoardItem category={IssuesCategories.TODO} issue={mockIssue} />)

        const draggableElement = screen.getByTestId("board-item")

        const mockEvent = {
            dataTransfer: {
                setData: jest.fn(), // Mock the setData function
            },
        }
        fireEvent.dragStart(draggableElement, mockEvent)

        expect(draggableElement.getAttribute("draggable")).toBe("true")
        expect(screen.getByTestId("board-item")).toBeInTheDocument()
        expect(draggableElement.getAttribute("data-testid")).toBe("board-item")

        expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith("issue", JSON.stringify(mockIssue))
        expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith("oldCategory", mockCategory)
    })

    it("triggers drag end event correctly", () => {
        const { getByTestId } = renderWithProviders(<BoardItem category={IssuesCategories.TODO} issue={mockIssue} />)

        const cardElement = getByTestId("board-item")
        fireEvent.dragEnd(cardElement)

        expect(cardElement.getAttribute("class")).not.toContain("dragging")
    })
})