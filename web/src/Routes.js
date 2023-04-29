// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import DashboardLayout from './layouts/DashboardLayout'

import { useAuth } from './auth'
import NormalLayout from './layouts/NormalLayout/NormalLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Private unauthenticated="home">
        <Set wrap={ScaffoldLayout} title="Currencies" titleTo="currencies" buttonLabel="New Currency" buttonTo="newCurrency">
          <Route path="/settings/currencies/new" page={CurrencyNewCurrencyPage} name="newCurrency" />
          <Route path="/settings/currencies/{id:Int}/edit" page={CurrencyEditCurrencyPage} name="editCurrency" />
          <Route path="/settings/currencies/{id:Int}" page={CurrencyCurrencyPage} name="currency" />
          <Route path="/settings/currencies" page={CurrencyCurrenciesPage} name="currencies" />
        </Set>
      </Private>
      <Private unauthenticated="home">
        <Set wrap={ScaffoldLayout} title="Categories" titleTo="categories" buttonLabel="New Category" buttonTo="newCategory">
          <Route path="/admin/categories/new" page={CategoryNewCategoryPage} name="newCategory" />
          <Route path="/admin/categories/{id:Int}/edit" page={CategoryEditCategoryPage} name="editCategory" />
          <Route path="/admin/categories/{id:Int}" page={CategoryCategoryPage} name="category" />
          <Route path="/admin/categories" page={CategoryCategoriesPage} name="categories" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Wallets" titleTo="wallets" buttonLabel="New Wallet" buttonTo="newWallet">
          <Route path="/admin/wallets/new" page={WalletNewWalletPage} name="newWallet" />
          <Route path="/admin/wallets/{id:Int}/edit" page={WalletEditWalletPage} name="editWallet" />
          <Route path="/admin/wallets/{id:Int}" page={WalletWalletPage} name="wallet" />
          <Route path="/admin/wallets" page={WalletWalletsPage} name="wallets" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Expenses" titleTo="expenses" buttonLabel="New Expense" buttonTo="newExpense">
          <Route path="/admin/expenses/new" page={ExpenseNewExpensePage} name="newExpense" />
          <Route path="/admin/expenses/{id:Int}/edit" page={ExpenseEditExpensePage} name="editExpense" />
          <Route path="/admin/expenses/{id:Int}" page={ExpenseExpensePage} name="expense" />
          <Route path="/admin/expenses" page={ExpenseExpensesPage} name="expenses" />
        </Set>
        <Set wrap={DashboardLayout}>
          <Route path="/dashboard" page={DashboardPage} name="dashboard" />
        </Set>
      </Private>
      <Set wrap={NormalLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
