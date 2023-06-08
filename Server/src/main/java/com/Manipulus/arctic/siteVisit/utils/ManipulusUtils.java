package com.Manipulus.arctic.siteVisit.utils;

import com.google.common.base.Strings;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mysql.cj.protocol.a.NativeConstants;
import lombok.Data;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;


public class ManipulusUtils {

    private ManipulusUtils() {

    }

    public static ResponseEntity<String> getResponsesEntity(String responseMessage, HttpStatus httpStatus) {
        return new ResponseEntity<String>("{\"message\":\"" + responseMessage + "\"}", httpStatus);

    }

    public static String getUUID() {
        Date date = new Date();
        long time = date.getTime();
        return "SITE-VISIT-" + time;
    }

    public static JSONArray getJsonArrayFromString(String data) throws JSONException {
        JSONArray jsonArray =new JSONArray(data);
        return jsonArray;

    }

    public static Map<String, Object> getMapFromJSON(String data) {
        if (!Strings.isNullOrEmpty(data)) {
            return new Gson().fromJson(data, new TypeToken<Map<String, Object>>() {
            }.getType());
        }
        return new HashMap<>();
    }

}
