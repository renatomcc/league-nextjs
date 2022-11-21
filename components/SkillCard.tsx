import styled from "@emotion/styled";
import {
  Button,
  ButtonProps,
  createPolymorphicComponent,
} from "@mantine/core";
import { FallbackImage } from "./FallbackImage";

export function Skill(props: any) {
  return (
    <>
      <StyledButton className="spell-image">
        <FallbackImage
          src={props.props.image}
          alt={props.props.name}
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
  &:hover {
    transform: scale(1.15);
  }
`;

const StyledButton = createPolymorphicComponent<"button", ButtonProps>(
  _StyledButton
);
