import styled from "styled-components";

export default function Status({ status = "draft" }) {
  const getStatusStyles = (statusType) => {
    const formatted = statusType.toLowerCase();
    switch (formatted) {
      case "paid":
        return { text: "Paid", bg: "rgba(51, 214, 159, 0.06)", color: "#33D69F" };
      case "pending":
        return { text: "Pending", bg: "rgba(255, 143, 0, 0.06)", color: "#FF8F00" };
      case "draft":
      default:
        return { text: "Draft", bg: "rgba(223, 227, 251, 0.06)", color: "#DFE3FB" };
    }
  };

  const currentStatus = getStatusStyles(status);

  return (
    <Badge bg={currentStatus.bg} color={currentStatus.color}>
      <Dot color={currentStatus.color} />
      {currentStatus.text}
    </Badge>
  );
}

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 104px;
  height: 40px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.25px;
  text-transform: capitalize;
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;
