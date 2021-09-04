import React from "react";
import TestRenderer, {create} from "react-test-renderer";
import ProfileStatus from "./profile-status";
const mockCallback = jest.fn()
const props = {status: 'some status', updateUserStatus: mockCallback}
describe("ProfileStatus component", () => {
  test("Should contain correct status #1", () => {
    const component = create(<ProfileStatus {...props} />);
    const root  = component.root
    expect(root.instance.state.status).toBe("some status");
  });
  test("Should contain correct status #2", () => {
    const component = create(<ProfileStatus {...props} />);
    const root = component.root;
    const span = root.findByType("span")
    expect(span.props.children).toBe("some status");
  });
  test("Should display <span>", () => {
    const component = create(<ProfileStatus {...props} />);
    const root = component.root;
    const span = root.findByType("span")
    expect(span).not.toBeNull();
  });
  test("Should not display <input> ", () => {
    const component = create(<ProfileStatus {...props} />);
    const root = component.root;
    expect(() => {
      const input= root.findByType("input")
    }).toThrow();
  });
  test("When doubleClicked Expect editMode to be true", () => {
    const component = create(<ProfileStatus {...props} />);
    const root = component.root;
    const span = root.findByType("span");
    span.props.onDoubleClick();
    expect(root.instance.state.editMode).toBeTruthy();
  });

  test("Should display input in editMode when double click on span", () => {
    const component = create(<ProfileStatus {...props} />);
    const root = component.root;
    const span = root.findByType("span");
    span.props.onDoubleClick();
    const input = root.findByType("input");

    expect(input.props.value).toBe("some status");
  });
  test("Callback should be called", () => {
    
    const component = TestRenderer.create(<ProfileStatus {...props} />);
    const root = component.root;
    root.instance.deactivateEditMode()
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
