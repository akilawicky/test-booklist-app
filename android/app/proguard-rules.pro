# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }
-dontwarn com.facebook.**

# Hermes bytecode
-keep class com.facebook.hermes.unicode.** { *; }

# Keep native methods
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <methods>;
}
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>;
}

# OkHttp / networking
-dontwarn okhttp3.**
-dontwarn okio.**
-keep class okhttp3.** { *; }

# Firebase
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }

# react-native-svg
-keep public class com.horcrux.svg.** { *; }

# Keep JavaScript interface methods
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep native method names
-keepclasseswithmembernames class * { native <methods>; }

# Keep enum members (prevents IllegalArgumentException at runtime)
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Prevent stripping of Formik / JS bridge annotations
-keepattributes *Annotation*
-keepattributes Signature
-keepattributes SourceFile,LineNumberTable
-keep class com.lugg.ReactNativeConfig.** { *; }
-keep public class * extends android.app.Application

# react-native-ssl-public-key-pinning — prevent R8 from stripping TurboModule classes
-keep class com.frw.sslpublickeypinning.** { *; }
-keepclassmembers class com.frw.sslpublickeypinning.** { *; }
