import java.util.Scanner;
public class ArraySumAverage {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter number of elements: ");
        int n = scanner.nextInt();
        int[] arr = new int[n];
        int sum = 0;
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
            sum += arr[i];
        }
        double avg = n > 0 ? (double) sum / n : 0;
        System.out.println(sum);
        System.out.println(avg);
        scanner.close();
    }
}