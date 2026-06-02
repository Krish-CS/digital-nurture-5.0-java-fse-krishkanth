import java.util.Scanner;
public class PalindromeChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String s = scanner.nextLine();
        String cleaned = s.replaceAll("[^A-Za-z0-9]", "").toLowerCase();
        String rev = new StringBuilder(cleaned).reverse().toString();
        System.out.println(cleaned.equals(rev) ? "Palindrome" : "Not a palindrome");
        scanner.close();
    }
}