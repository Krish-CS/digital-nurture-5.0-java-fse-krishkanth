public class PatternSwitchDemo {
    public static void printType(Object obj) {
        String message = switch (obj) {
            case Integer i -> "Integer: " + i;
            case String s -> "String: " + s;
            case Double d -> "Double: " + d;
            default -> "Other type";
        };
        System.out.println(message);
    }

    public static void main(String[] args) {
        printType(5);
        printType("hello");
        printType(3.14);
        printType(true);
    }
}
