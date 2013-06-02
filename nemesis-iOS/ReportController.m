//
//  ReportController.m
//  nemesis
//
//  Created by mattia benedetti on 02/06/13.
//  Copyright (c) 2013 mattia benedetti. All rights reserved.
//

#import "ReportController.h"

@interface ReportController ()

@end

@implementation ReportController

@synthesize latitudine, longitudine, name, description;


- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self)
    {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(IBAction)do_send:(id)sender
{
    NSLog(@"NAME: %@", name.text);
    NSLog(@"DESCRIPTION: %@", description.text);
    NSLog(@"REPORT-LONG: %@", longitudine);
    NSLog(@"REPORT-LAT: %@", latitudine);
    
    
    NSDictionary *entry = [NSDictionary dictionaryWithObjectsAndKeys:
                           name.text, @"name",
                           description.text, @"description",
                           latitudine, @"longitude",
                           longitudine, @"latitude",
                           nil];
    


    NSError* error;
    NSString* jsonString;
    NSData* jsonData = [NSJSONSerialization dataWithJSONObject: entry options:NSJSONWritingPrettyPrinted error:&error];
    jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    
    NSLog(@"JSON RISULTANTE %@", jsonString);
    

    
    NSURL *url = [NSURL URLWithString:@"http://10.23.32.29:3000/issues/create"];
    
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:url];
    NSData *requestData = [NSData dataWithBytes:[jsonString UTF8String] length:[jsonString length]];
    
    [request setHTTPMethod:@"POST"];
    [request setValue:@"application/json" forHTTPHeaderField:@"Accept"];
    [request setValue:@"application/x-www-form-urlencoded" forHTTPHeaderField:@"Content-Type"];
    [request setValue:[NSString stringWithFormat:@"%d", [requestData length]] forHTTPHeaderField:@"Content-Length"];
    [request setHTTPBody: requestData];
    
    [NSURLConnection connectionWithRequest: request delegate:self];
}

- (void) connection:(NSURLConnection *)connection didReceiveData:(NSData *)data
{
    NSMutableData *d = [NSMutableData data];
    [d appendData:data];
    
    NSString *a = [[NSString alloc] initWithData:d encoding:NSASCIIStringEncoding];
    
    NSLog(@"Data: %@", a);
}

-(IBAction)chiudi_tastiera:(id)sender
{
    [self.view endEditing:TRUE];
}

@end
