import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import PostSection from "../src/components/PostSection/view";
import GetSection from "../src/components/GetSection/view";
import axios from "axios";
import App from "../src/App";

test('renders "React Axios example - netlify"', () => {
  render(<App />);
  const headerElement = screen.getByText(/React Axios example - netlify/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders "React Axios GET"', () => {
  render(<GetSection />);
  const headerElement = screen.getByText(/React Axios GET/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders "Get All" button', () => {
  render(<GetSection />);

  const buttonElement = screen.getByText(/Get All/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders "Clear" button', () => {
  render(<GetSection />);

  const buttonElement = screen.getByText(/clear/i);
  const button = screen.getByTestId("clear-button");
  userEvent.click(button);
  expect(buttonElement).toBeInTheDocument();
});

jest.mock("axios");

const mockResponse = {
  data: [
    {
      "id": 1,
      "name": "Kue Kering",
      "price": 10000,
      "stock": 100,
      "imageUrl": ""
    },
    {
      "id": 2,
      "name": "Kue Basah",
      "price": 10000,
      "stock": 62,
      "imageUrl": ""
    },
    {
      "id": 3,
      "name": "Kue Gajah",
      "price": 12000,
      "stock": 108,
      "imageUrl": ""
    }
  ]
};

const mockError = {
  data: null,
  message: "Error",
};

test("renders products", async () => {
  await act(async () => {
    await axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
    render(<GetSection />);

    const button = screen.getByTestId("get-all-button");
    userEvent.click(button);
  });

  const response = screen.getByTestId("response");
  expect(response).toBeInTheDocument();
});

test("renders error", async () => {
  await act(async () => {
    await axios.get.mockImplementationOnce(() => Promise.reject(mockError));
    render(<GetSection />);

    const button = screen.getByTestId("get-all-button");
    userEvent.click(button);
  });
});

test('renders "React Axios Post"', () => {
  render(<PostSection />);
  const headerElement = screen.getByText(/React Axios Post/i);
  expect(headerElement).toBeInTheDocument();
});

test("Title", () => {
  const testText = "Testing";

  render(<PostSection />);

  const input = screen.getByTestId("title-input");
  userEvent.type(input, testText);
  const textElement = screen.getByText(`Title: ${testText}`);
  expect(textElement).toBeInTheDocument();
});

test("Description", () => {
  const testText = "Testing";

  render(<PostSection />);

  const input = screen.getByTestId("description-input");
  userEvent.type(input, testText);
  const textElement = screen.getByText(`Description: ${testText}`);
  expect(textElement).toBeInTheDocument();
});

test('renders "Post" button', () => {
  render(<PostSection />);

  const buttonElement = screen.getByText(/Post Data/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders "Clear" button', () => {
  render(<PostSection />);

  const buttonElement = screen.getByText(/Clear/i);
  const button = screen.getByTestId("clear-button");
  userEvent.click(button);
  expect(buttonElement).toBeInTheDocument();
});



