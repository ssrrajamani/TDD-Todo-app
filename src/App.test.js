import { fireEvent, render } from '@testing-library/react';
import App from './App';
import Enzyme from 'enzyme';
import userEvent from "@testing-library/user-event";
import { shallow } from 'enzyme'
import ListItems from './ListItems';
import CreateTask from './CreateTask';
import "@testing-library/jest-dom/extend-expect";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

describe("Basic render of App ", () => {

  let appWrapper;
  let taskWrapper;
  beforeAll(() => {
    appWrapper = shallow(<App />);
    taskWrapper = shallow(<CreateTask />);
  });

  it("should have a form", () => {

    const findForm = taskWrapper.find("#to-do-form");
    expect(findForm).toBeDefined();
  });

  it("should have a Add button to add the note to the list", () => {

    const findButton = taskWrapper.find("#add-button");
    expect(findButton).toBeDefined();
  });

  it("should have a input field to enter the note", () => {
    const appRender = render(<App />);
    const value = appRender.getByTestId("notes-input");
    expect(value).toHaveTextContent("");
  });

  it("has state", () => {
    const appState = appWrapper.state();
    expect(appState).not.toBeNull();
  });

  it("has state with items list to store the notes", () => {
    const itemsList = appWrapper.state();
    expect(itemsList.items).toBeDefined();
  });

  it("has state with current item object to store the current entered note", () => {
    const itemsList = appWrapper.state();
    expect(itemsList.currentItem).toBeDefined();
  });

  it("has create task children component to add the notes", () => {
    expect(appWrapper.find(CreateTask)).toHaveLength(1);
  });

  it("has ListItems children component to display the notes", () => {
    expect(appWrapper.find(ListItems)).toHaveLength(1);
  });

  it("adds a note", () => {
    const submit = jest.fn();
    const appRender = render(<CreateTask addTask={submit} />);
    userEvent.type(appRender.getByTestId("notes-input"), "ssr");
    fireEvent.click(appRender.getByTestId("addSubmit"));
    expect(submit).toHaveBeenCalled();

  });

  it("should edit a task", () => {
    const mockEdit = jest.fn().mockName("updateList");
    const mocktask = [{ text: 'ss', key: 1646545307405 }, { text: 'ssr', key: 1646545312925 }];
    const appRender = render(
      <ListItems itemList={mocktask} updateList={mockEdit} />
    )
    fireEvent.click(appRender.getByTestId(1646545312925));
    userEvent.type(appRender.getByTestId(1646545312925), "Work");
    expect(mockEdit).toHaveBeenCalledTimes(4);

  });

  it("should delete a task", () => {
    const mockDelete = jest.fn().mockName("deleteItem");
    const mocktask = [{ text: 'ss', key: 1646545307405 }, { text: 'ssr', key: 1646545312925 }];
    const appRender = render(
      <ListItems itemList={mocktask} deleteItem={mockDelete} />
    )
    fireEvent.click(appRender.getByTestId("deleteButton1646545307405"));
    expect(mockDelete).toHaveBeenCalledWith(1646545307405);
  });
});


