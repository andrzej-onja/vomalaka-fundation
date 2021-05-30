import axios from "axios";

export const sendQuery = (query: any, variables?: any): Promise<any> => {
  return axios.post("http://localhost:4000/graphql?", {
    query,
  });
};

export const getBooksQuery = () => {
  return `{
        books{name, author, id}
      }`;
};
