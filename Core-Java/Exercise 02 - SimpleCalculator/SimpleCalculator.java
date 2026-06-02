import java.util.Scanner;
public class SimpleCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter first number: ");
        double a = scanner.nextDouble();
        System.out.print("Enter second number: ");
        double b = scanner.nextDouble();
        System.out.print("Enter operation (+, -, *, /): ");
        String op = scanner.next();
        double result = 0;
        if (op.equals("+")) {
            result = a + b;
        } else if (op.equals("-")) {
            result = a - b;
        } else if (op.equals("*")) {
            result = a * b;
        } else if (op.equals("/")) {
            if (b != 0) {
                result = a / b;
            } else {
                System.out.println("Cannot divide by zero");
                scanner.close();
                return;
            }
        }
        System.out.println("Result: " + result);
        scanner.close();
    }
}