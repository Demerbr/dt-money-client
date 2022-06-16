import {  useTransactions } from "../../hooks/useTransactions"
import { Container } from "./styles"

import deleteIcon from "../../assets/remover.svg"



export function TransationsTable(){
    const {transactions} = useTransactions()
    const { deleteTransaction } = useTransactions()

    
    


    return(

        <Container>
        <table>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Valor</th>
                    <th>Categoria</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => {
                  return(
                    <tr key={transaction.id}>
                    <td>{transaction.title}</td> 
                    <td className={transaction.type}>
                        {new Intl.NumberFormat('pt-BR',{
                            style: 'currency',
                            currency: 'BRL'
                        }).format(transaction.amount)}
                    </td>
                    <td>{transaction.category}</td> 
                    <td>
                        {new Intl.DateTimeFormat('pt-BR').format(
                            new Date(transaction.createdAt)
                        )}
                    </td>
                    <td>
                        <button  className="delete-transaction" onClick={() => deleteTransaction(transaction.id)}>
                            <img className="img-delete-transaction" src={deleteIcon} alt="" />

                        </button>
                    </td>
                </tr> 
                  )
              })}
                
            </tbody>
        </table>
    </Container>
    )
   
}