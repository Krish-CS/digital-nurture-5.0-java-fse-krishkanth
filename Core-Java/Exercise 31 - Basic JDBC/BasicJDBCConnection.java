import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
public class BasicJDBCConnection {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:Core-Java/sample.db";
        try {
            Class.forName("org.sqlite.JDBC");
        } catch (ClassNotFoundException e) {
            System.out.println("SQLite JDBC driver not found");
            return;
        }

        try (Connection conn = DriverManager.getConnection(url);
             Statement stmt = conn.createStatement()) {
            stmt.execute("CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, name TEXT, grade INTEGER)");
            stmt.execute("INSERT OR IGNORE INTO students VALUES (1, 'Alice', 85)");
            stmt.execute("INSERT OR IGNORE INTO students VALUES (2, 'Bob', 92)");
            ResultSet rs = stmt.executeQuery("SELECT * FROM students");
            while (rs.next()) {
                System.out.println(rs.getInt("id") + " " + rs.getString("name") + " " + rs.getInt("grade"));
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
