import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
public class JDBCTransactionDemo {
    public static void transferFunds(int fromId, int toId, double amount) {
        String url = "jdbc:sqlite:Core-Java/sample.db";
        try (Connection conn = DriverManager.getConnection(url)) {
            conn.setAutoCommit(false);
            try (Statement stmt = conn.createStatement()) {
                stmt.execute("CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY, name TEXT, balance REAL)");
                stmt.execute("INSERT OR IGNORE INTO accounts VALUES (1, 'Alice', 1000)");
                stmt.execute("INSERT OR IGNORE INTO accounts VALUES (2, 'Bob', 500)");
                stmt.execute("UPDATE accounts SET balance = balance - " + amount + " WHERE id = " + fromId);
                stmt.execute("UPDATE accounts SET balance = balance + " + amount + " WHERE id = " + toId);
                conn.commit();
                System.out.println("Transfer successful");
            } catch (Exception e) {
                conn.rollback();
                System.out.println("Transfer failed, rolled back: " + e.getMessage());
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
    public static void main(String[] args) {
        transferFunds(1, 2, 200);
    }
}
