import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';


interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}



type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;


interface TransactionsProviderProps {
    children: ReactNode
}

interface TransactionContextData{
    transactions: Transaction[]
    createTransaction: (transaction: TransactionInput) => Promise<void>
    deleteTransaction: (id: string) => Promise<void>
}


const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
    );

export function TransactionProvider({children}: TransactionsProviderProps){

    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() =>{
        api.get('/transaction') 
        .then(response => setTransactions(response.data.transactions))
    }, [])

    useEffect(() =>{
        api.get('/transaction') 
        .then(response => setTransactions(response.data.transactions))
    }, [transactions])


    async function createTransaction(transactionInput: TransactionInput){
       
       const response =  await api.post('/transaction', {
           ...transactionInput,
        //    createdAt: new Date()
       })
       const { transaction } = response.data;

       setTransactions([
           ...transactions,
           transaction
       ])
    }

    async function deleteTransaction(id: string){
        

         await api.delete(`/transaction/${id}`)

         
    }

    
    

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction, deleteTransaction}}>

            {children}

        </TransactionsContext.Provider>
    )

}

export function useTransactions(){
    const context = useContext(TransactionsContext)

     return context
}



