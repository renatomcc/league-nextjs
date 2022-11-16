import styled from "@emotion/styled";
import {
  ActionIcon,
  Button,
  ButtonProps,
  createPolymorphicComponent,
  Modal,
  Title,
  Text,
  TextProps,
} from "@mantine/core";
import { useState } from "react";
import { FallbackImage } from "./FallbackImage";

export function Skill(props: any) {
  const [spellTitle, setSpellTitle] = useState("");
  const [spellDescription, setSpellDescription] = useState("");
  const [spellModal, setSpellModal] = useState(false);
  return (
    <>
      <StyledButton>
        <FallbackImage
          src={props.props.image}
          alt={props.props.name}
          title={props.props.name}
          onClick={() => {
            setSpellTitle(props.props.name);
            setSpellDescription(props.props.description);
            setSpellModal(!spellModal);
          }}
        />
      </StyledButton>
    </>
  );
}

export default Skill;

const _StyledButton = styled(Button)`
  border: 3px solid #d29246;
  border-radius: 50%;
  background-color: white;
  width: 70px;
  height: 70px;
  padding: 0px;
  transition: all linear 0.2s;
  &:hover {
    transform: scale(1.15);
  }
`;

const StyledButton = createPolymorphicComponent<"button", ButtonProps>(
  _StyledButton
);
