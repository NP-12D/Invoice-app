import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import arrowDown from "../assets/icon-arrow-down.svg";
import arrowcheck from "../assets/icon-check.svg";
const STATUS_OPTIONS = [
  { id: "draft", label: "Draft" },
  { id: "pending", label: "Pending" },
  { id: "paid", label: "Paid" },
];

export default function Filter() {
  const [selectedStatuses, setSelectedStatuses] = useState({
    draft: false,
    pending: true,
    paid: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Wrapper ref={dropdownRef}>
      <FilterButton onClick={() => setIsOpen(!isOpen)}>
        Filter by status
        <Chevron src={arrowDown} $open={isOpen} />
      </FilterButton>

      {isOpen && (
        <Dropdown>
          {STATUS_OPTIONS.map((status) => (
            <CheckboxLabel key={status.id}>
              <HiddenCheckbox
                type="checkbox"
                checked={selectedStatuses[status.id]}
                onChange={() => handleCheckboxChange(status.id)}
              />

              <Checkmark checked={selectedStatuses[status.id]}>
                <img src={arrowcheck} alt="check" />
              </Checkmark>
              {status.label}
            </CheckboxLabel>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const FilterButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Chevron = styled.img`
  transition: transform 0.3s ease;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
`;

const Dropdown = styled.div`
  position: absolute;
  width: 192px;
  height: 128px;

  top: 100%;
  right: 0;
  margin-top: 8px;
  background: ${({ theme }) => theme.secondaryBg};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  width: 192px;
  z-index: 100;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
  &:hover span {
    border: 1.5px solid
      ${({ checked, theme }) => (checked ? "#7C5DFA" : theme.accent)};
  }
`;

const Checkmark = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  margin-right: 12px;
  background-color: ${({ checked, theme }) =>
    checked ? "#7C5DFA" : theme.secondaryHover};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 7.469947814941406px;
    height: 5.345695495605469px;

    display: ${({ checked }) => (checked ? "flex" : "none")};
  }
`;
