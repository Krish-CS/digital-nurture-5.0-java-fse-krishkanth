import java.lang.reflect.Method;
public class ReflectionDemo {
    public static void sayHello(String name) {
        System.out.println("Hello " + name + " via reflection");
    }

    public static void main(String[] args) throws Exception {
        Class<?> cls = Class.forName("ReflectionDemo");
        Method[] methods = cls.getDeclaredMethods();
        for (Method m : methods) {
            System.out.println("Method: " + m.getName());
            Class<?>[] params = m.getParameterTypes();
            for (Class<?> param : params) {
                System.out.println("Parameter: " + param.getSimpleName());
            }
        }
        Method m = cls.getMethod("sayHello", String.class);
        m.invoke(null, "Student");
    }
}
