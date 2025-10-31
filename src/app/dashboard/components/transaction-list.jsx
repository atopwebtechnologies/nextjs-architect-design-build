import { mockTransactions } from "@/mock-data/data";
import TransactionsItem from "./transaction-items";

// async function getTransactions() {
//   // Simulate a network delay of 2 seconds
//   await new Promise((resolve) => setTimeout(() => resolve(), 2000));

//   // Return the hardcoded data directly.
//   return mockTransactions;
// }

export default function TransactionsList() {
  // let transactions = [];
  // let error = null;

  // try {
  //   transactions = await getTransactions();
  // } catch (err) {
  //   console.error(err);
  //   error = "Failed to fetch transactions. Please try again.";
  // }

  // if (error) {
  //   return (
  //     <div className="text-center py-4 text-red-500">
  //       <h2 className="font-bold mb-2">Error</h2>
  //       <p>{error}</p>
  //     </div>
  //   );
  // }
  return <TransactionsItem initialTransactions={mockTransactions} />;
}
