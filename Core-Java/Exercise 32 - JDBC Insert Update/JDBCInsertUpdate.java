import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;
class StudentDAO {
    private String url = "jdbc:sqlite:Core-Java/sample.db";

    private void createTable(Connection conn) throws Exception {
        try (Statement stmt = conn.createStatement()) {
            stmt.execute("CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, name TEXT, grade INTEGER)");
        }
    }

    public void insertStudent(int id, String name, int grade) {
        String sql = "INSERT INTO students VALUES (?, ?, ?)";
        try (Connection conn = DriverManager.getConnection(url)) {
            createTable(conn);
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, id);
            pstmt.setString(2, name);
            pstmt.setInt(3, grade);
            pstmt.executeUpdate();
            pstmt.close();
            System.out.println("Inserted: " + name);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
    public void updateStudent(int id, int newGrade) {
        String sql = "UPDATE students SET grade = ? WHERE id = ?";
        try (Connection conn = DriverManager.getConnection(url)) {
            createTable(conn);
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, newGrade);
            pstmt.setInt(2, id);
            int rows = pstmt.executeUpdate();
            pstmt.close();
            if (rows > 0) {
                System.out.println("Updated student " + id + " to grade " + newGrade);
            } else {
                System.out.println("Student not found");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
public class JDBCInsertUpdate {
    public static void main(String[] args) {
        StudentDAO dao = new StudentDAO();
        dao.insertStudent(3, "Charlie", 78);
        dao.updateStudent(3, 88);
    }
}
