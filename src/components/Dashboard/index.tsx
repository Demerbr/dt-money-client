import { Summary } from "../summary";
import { TransationsTable } from "../transationsTable";
import { Container } from "./styles";

export function Dashboard(){
    return(
       <Container>
           <Summary />
           <TransationsTable />
           
       </Container>
    )
}