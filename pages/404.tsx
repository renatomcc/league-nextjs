import Link from "next/link";
import Image from "next/image";
import { Badge, Group, Text } from "@mantine/core";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { StyledButton } from ".";

function NotFound() {
  return (
    <StyledDiv>
      <Text color="#d6951b" weight={700} size="xl">
        &quot;Hmm... let me fix that.&quot;
      </Text>
      <Group>
        <Image
          src="https://i.ibb.co/smbwSZ5/404.png"
          alt="Error"
          priority
          style={{
            borderRadius: "50%",
            boxShadow: "6px 6px 10px rgba(0,0,0,0.4)",
          }}
          width={300}
          height={300}
        />
      </Group>

      <StyledButton
        variant="gradient"
        gradient={{ from: "#84320b", to: "#d6951b", deg: 1 }}
        size="md"
        component="a"
        href="/champions"
      >
        Voltar
      </StyledButton>
    </StyledDiv>
  );
}

export default NotFound;

const StyledDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;
