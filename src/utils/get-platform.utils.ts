import os from "os";

export const enum PLATFORMS {
  WINDOWS = "WINDOWS",
  MAC = "MAC",
  LINUX = "LINUX",
  SUN = "SUN",
  OPENBSD = "OPENBSD",
  ANDROID = "ANDROID",
  AIX = "AIX",
}

export const enum PLATFORM_NAMES {
  win32 = PLATFORMS.WINDOWS,
  darwin = PLATFORMS.MAC,
  linux = PLATFORMS.LINUX,
  sunos = PLATFORMS.SUN,
  openbsd = PLATFORMS.OPENBSD,
  android = PLATFORMS.ANDROID,
  aix = PLATFORMS.AIX,
}

/**
 * Returns the current platform
 * @returns {PLATFORM_NAMES} platform
 */
export const getCurrentPlatform = (): PLATFORMS => {
  const currentPlatform = os.platform() as keyof typeof PLATFORM_NAMES;
  return <PLATFORMS>PLATFORM_NAMES[currentPlatform];
};
