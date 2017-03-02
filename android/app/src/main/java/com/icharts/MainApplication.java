package com.icharts;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import com.rnziparchive.RNZipArchivePackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.example.react_native_tileview.TileviewPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNFSPackage(),
          new RNZipArchivePackage(),
          new LinearGradientPackage(),
          new TileviewPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
