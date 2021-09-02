import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./profile-status";

describe("ProfileStatus component", () => {
  test("Should contain correct status #1", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("it-kamasutra");
  });
  test("Should contain correct status #2", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const instance = component.root;
    const span = instance.findByType("span")
    expect(span.props.children).toBe("it-kamasutra");
  });
  test("Should display <span>", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const instance = component.root;
    const span = instance.findByType("span")
    expect(span).not.toBeNull();
  });
  test("Should not display <input> ", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const instance = component.root;
    expect(() => {
      const input= instance.findByType("input")
    }).toThrow();
  });
  test("When doubleClicked Expect editMode to be true", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const instance = component.root;
    const span = instance.findByType("span");
    span.props.onDoubleClick();
    expect(instance._fiber.stateNode.state.editMode).toBeTruthy();
  });

  test("Should display input in editMode when double click on span", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const instance = component.root;
    const span = instance.findByType("span");
    span.props.onDoubleClick();
    const input = instance.findByType("input");

    expect(input.props.value).toBe("it-kamasutra");
  });
  test("Callback should be called", () => {
    const mockCallback = jest.fn()
    const component = create(<ProfileStatus
      status="it-kamasutra"
      updateUserStatus={mockCallback}
    />);
    const instance = component.getInstance();
    instance.deactivateEditMode()
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});