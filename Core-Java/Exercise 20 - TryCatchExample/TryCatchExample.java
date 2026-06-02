import java.util.Scanner;
public class TryCatchExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter first integer: ");
        int a = scanner.nextInt();
        System.out.print("Enter second integer: ");
        int b = scanner.nextInt();
        try {
            int r = a / b;
            System.out.println(r);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        } finally {
            scanner.close();
        }
    }
}