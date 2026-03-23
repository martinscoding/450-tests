package ch.wiss.m450.starter_project;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.lang.reflect.Method;

import org.junit.jupiter.api.Test;

class StarterProjectApplicationTests {

    @Test
    void shouldHaveMainMethod() throws NoSuchMethodException {
        Method mainMethod = StarterProjectApplication.class.getDeclaredMethod("main", String[].class);
        assertNotNull(mainMethod);
    }
}