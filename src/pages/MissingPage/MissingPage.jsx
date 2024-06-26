import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";

export default function MissingPage() {
  return (
    <ErrorComponent
      error={{ name: "404", message: "This page is not a valid route." }}
    />
  );
}
