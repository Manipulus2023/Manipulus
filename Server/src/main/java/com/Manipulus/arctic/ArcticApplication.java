package com.Manipulus.arctic;

import net.sf.jasperreports.engine.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class ArcticApplication {

	public static void main(String[] args) throws JRException {

		SpringApplication.run(ArcticApplication.class, args);
		String filePath="C:\\Manipulus 7.0\\Manipulus\\Server\\src\\main\\resources\\template\\gatePass.jrxml";
		Map<String,Object> parameters=new HashMap<>();
		parameters.put("siteVisitId",123);
		parameters.put("jobId",456);
		parameters.put("scheduledDate",java.sql.Date.valueOf("2022-07-07"));
		parameters.put("endDate",java.sql.Date.valueOf("2022-07-08"));
		JasperReport report= JasperCompileManager.compileReport(filePath);
		JasperPrint print= JasperFillManager.fillReport(report,parameters,new JREmptyDataSource());
		JasperExportManager.exportReportToPdfFile(print,"C:\\Manipulus 7.0\\Manipulus\\Server\\src\\main\\resources\\static\\gatePass.pdf");
		System.out.println("Report Generated Successfully");
	}
	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Accept", "Authorization", "Origin, Accept", "X-Requested-With",
				"Access-Control-Request-Method", "Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
				"Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);

	}
}
