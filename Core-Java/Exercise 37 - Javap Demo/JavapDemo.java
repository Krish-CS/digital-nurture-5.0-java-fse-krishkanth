public class JavapDemo {
    public int square(int num) {
        return num * num;
    }

    public static void main(String[] args) {
        JavapDemo demo = new JavapDemo();
        System.out.println("Square: " + demo.square(5));
    }
}
