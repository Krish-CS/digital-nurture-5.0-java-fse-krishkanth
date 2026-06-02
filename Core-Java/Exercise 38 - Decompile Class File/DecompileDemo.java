import java.util.List;
public class DecompileDemo {
    private String name;
    public DecompileDemo(String name) {
        this.name = name;
    }
    public String greet(String msg) {
        return name + " says " + msg;
    }
    public static int sumEven(List<Integer> nums) {
        int total = 0;
        for (int n : nums) {
            if (n % 2 == 0) {
                total += n;
            }
        }
        return total;
    }
    public static void main(String[] args) {
        DecompileDemo d = new DecompileDemo("Demo");
        System.out.println(d.greet("Hello"));
        System.out.println(sumEven(List.of(1, 2, 3, 4, 5, 6)));
    }
}
