cmake_minimum_required(VERSION 3.9.0)
project(indyvdrreactnative)

set (PACKAGE_NAME "indyvdrreactnative")
set (LIB_NAME "indyvdr")
set (BUILD_DIR ${CMAKE_SOURCE_DIR}/build)
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 17)

file (GLOB LIBVDR_DIR "${CMAKE_SOURCE_DIR}/../native/mobile/android/${ANDROID_ABI}")

include_directories(
  ../cpp
  ../cpp/include
  "${LIBVDR_DIR}"
  "${REACT_NATIVE_DIR}/React"
  "${REACT_NATIVE_DIR}/React/Base"
  "${REACT_NATIVE_DIR}/ReactCommon"
  "${REACT_NATIVE_DIR}/ReactCommon/jsi"
  "${REACT_NATIVE_DIR}/ReactCommon/callinvoker"
  "${REACT_NATIVE_DIR}/ReactAndroid/src/main/jni"
  "${REACT_NATIVE_DIR}/ReactAndroid/src/main/java/com/facebook/react/turbomodule/core/jni"
)

add_library(
  ${PACKAGE_NAME}
  SHARED
  cpp-adapter.cpp
  ../cpp/HostObject.cpp
  ../cpp/turboModuleUtility.cpp
  ../cpp/indyVdr.cpp
)

set_target_properties(
  ${PACKAGE_NAME}
  PROPERTIES
  CXX_STANDARD 17
  CXX_EXTENSION OFF
  POSITION_INDEPENDENT_CODE ON
)

find_package(ReactAndroid REQUIRED CONFIG)
find_package(fbjni REQUIRED CONFIG)

find_library(log-lib log)

find_library(
  VDR_LIB
  indy_vdr
  paths ${LIBVDR_DIR}
  NO_CMAKE_FIND_ROOT_PATH
)

if (NOT VDR_LIB)
  message(FATAL_ERROR "Could not find VDR_LIB at: ${LIBVDR_DIR}")
endif()

target_link_libraries(
  ${PACKAGE_NAME}
  ${VDR_LIB}
  ${log-lib}                      # <-- Logcat logger
  ReactAndroid::jsi               # <-- JSI
  fbjni::fbjni                    # <-- JNI core
  ReactAndroid::reactnativejni    # <-- React Native JNI core
  android                         # <-- Android JNI core
)
